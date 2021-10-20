//
//  InitialScreen.swift
//  InitialScreen
//
//  Created by Lowell Pence on 9/3/21.
//

import SwiftUI

// The first screen that is shown on launch
// Handles student identification
struct InitialScreen: View {

	@EnvironmentObject var sessionManager: SessionManager
	@FocusState private var isFocused: Bool
	@State private var isLoading = false // TODO: Implement loading indicator

	let focusCheck = Timer.publish(every: 5, tolerance: 5, on: .main, in: .common).autoconnect()
	
	var body: some View {
		HStack {
			CardSwipe
			CheckInInfo
		}
	}
	
	
	var CheckInInfo: some View {
		VStack {
			//Text("Walk In Hours")
		}
	}
	
	
	var CardSwipe: some View {
		VStack {
			
			// Not actually a tangible view - just using as a UIResponder
			StudentIDSwipeListener(inputHandler: sessionManager.inputHandler)
				.frame(width: 0, height: 0)
				.focused($isFocused)
			
				// Need to wait a second once view appears before focusing (SwiftUI bug? [iOS 15])
				.task {
					await Task.sleep(1_000_000_000)
					isFocused = true
				}
			
				// Every few seconds, check that the listener is still ready (just in case)
				.onReceive(focusCheck) { _ in
					if !isFocused { isFocused = true }
				}
			
				// Receives emitted student ID and calls fetchStudent
				.onReceive(sessionManager.inputHandler.studentID) { id in
					Task {
						await sessionManager.fetchStudent(id: id)
					}
				}
				
			
			IDCardGraphic().rotationEffect(.degrees(20))

			Text("Swipe ID Card to Check In")
				.font(.custom(Font.primary, size: 40))
				.bold()
				.padding()
			
			Button("Simulate Card Swipe") {
				sessionManager.currentSession.proceed()
			}
			Button("Disable focus") { isFocused = false }
			
			Circle()
				.foregroundColor(isFocused ? .ritGreen : .ritRed)
				.frame(width: 30, height: 30)
			
			ProgressView()
				.padding()
				.opacity(isLoading ? 1 : 0)
		}
	}
}


struct InitialScreen_Previews: PreviewProvider {
	
	static let sessionManager = SessionManager()
	
	static var previews: some View {
		InitialScreen()
			.previewInterfaceOrientation(.landscapeLeft)
			.environmentObject(sessionManager.currentSession)
			.environmentObject(sessionManager)
	}
}
