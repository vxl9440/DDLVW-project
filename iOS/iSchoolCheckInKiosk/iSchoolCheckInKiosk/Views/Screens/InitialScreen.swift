//
//  InitialScreen.swift
//  InitialScreen
//
//  Created by Lowell Pence on 9/3/21.
//

import SwiftUI

struct InitialScreen: View {

	@EnvironmentObject var session: CheckInSession
	@EnvironmentObject var sessionManager: SessionManager
	@FocusState private var isFocused: Bool
	@State private var isLoading = false // TODO: Implement loading indicator

	let timer = Timer.publish(every: 5, tolerance: 5, on: .main, in: .common).autoconnect()
	
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
			
//			#if DEBUG
//			Button("Simulate Card Swipe") {
//				session.studentID = "626001313"
//			}
//			#endif
			
			IDCardGraphic().rotationEffect(.degrees(20))

			Text("Swipe ID Card to Check In")
				.font(.custom(Font.primary, size: 40))
				.bold()
				.padding()
			
			Button("Disable focus") { isFocused = false }
			
			Circle()
				.foregroundColor(isFocused ? .ritGreen : .ritRed)
				.frame(width: 30, height: 30)
			
			StudentIDSwipeListener(inputHandler: sessionManager.inputHandler)
				.frame(width: 0, height: 0)
				.focused($isFocused)
				.task {
					await Task.sleep(1_000_000_000)
					isFocused = true
				}
				.onReceive(timer) { _ in // ensure that this view is always listening for an input
					if !isFocused {
						isFocused = true
					}
				}
			
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
