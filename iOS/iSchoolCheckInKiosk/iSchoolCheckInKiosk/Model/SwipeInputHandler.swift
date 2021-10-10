//
//  SwipeInputHandler.swift
//  iSchoolCheckInKiosk
//
//  Created by Lowell Pence on 10/9/21.
//

import SwiftUI
import Combine

// Used by a focused UIResponder to handle key presses from a physical device.
// (USB Card reader in this application's case)
protocol InputHandler {
	func handleInput(_ key: UIKey?)
	func didCancelInput()
}


// Concrete class of InputHandler for handling a Student's ID Card data
final class StudentIDHandler: InputHandler {
	
	private var rawData: String = ""
	
	// StudentID publisher - when a valid RIT ID is read in, this publisher emits it to all subscribers
	let studentID = PassthroughSubject<String, Never>()
	
	
	// Data from RIT ID is formatted like: ";999999999=0047?"
	func handleInput(_ key: UIKey?) {
		if let key = key {
			let keyValue = key.charactersIgnoringModifiers
			
			if keyValue == ";" || keyValue == "?" {
				// start of a new id
				rawData = ""
			} else if keyValue.isInt {
				rawData.append(keyValue)
			} else if keyValue == "=" && rawData.isValidRITidFormat {
				// end of id input so publish result or show error
				if rawData.isValidRITidFormat {
					studentID.send(rawData)
				} else {
					Task {
						await MainActor.run {
							ErrorManager.shared.presentAlert(AlertContext.cardReaderError)
						}
					}
				}
			}
		}
	}
	
	
	// Called if the sequence of input from card reader is disrupted
	func didCancelInput() {
		rawData = ""
	}
}


// UIView wrapper to access UIKit's UIResponder's "pressesBegan" api for handling a physical device input
// In SwiftUI, can be enabled by focusing it using a .focus modifier (added in iOS 15)
// Essentially listens for incoming data and sends it off to the provided input handler
struct StudentIDSwipeListener: UIViewRepresentable {
	
	let inputHandler: InputHandler
	
	func makeUIView(context: Context) -> IDListener {
		IDListener(handler: inputHandler)
	}
	
	func updateUIView(_ uiView: IDListener, context: Context) {}
	
	
	final class IDListener: UIView {
		
		let handler: InputHandler
		
		init(handler: InputHandler) {
			self.handler = handler
			super.init(frame: .zero)
		}
		
		required init?(coder: NSCoder) {
			fatalError("init(coder:) has not been implemented")
		}
		
		
		// Handle presses cancelled event
		override func pressesCancelled(_ presses: Set<UIPress>, with event: UIPressesEvent?) {
			handler.didCancelInput()
		}
		
		
		// Handle "presses" from the USB card swipe reader that acts as a keyboard emulator
		override func pressesBegan(_ presses: Set<UIPress>, with event: UIPressesEvent?) {
			handler.handleInput(presses.first?.key)
		}
		
		
		// Manually make this view focusable
		override var canBecomeFocused: Bool { true }
		
		
		// Manually make this view a first responder
		override var canBecomeFirstResponder: Bool { true }
	}
}
