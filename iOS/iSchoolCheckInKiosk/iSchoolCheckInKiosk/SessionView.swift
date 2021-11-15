//
//  ContentView.swift
//  iSchoolCheckInKiosk
//
//  Created by Lowell Pence on 9/1/21.
//

import SwiftUI

/**
 1. Launch app and load plist files - will crash if this fails
 2. First step is for user to authenticate
	2a. Authenticate with RIT ID
	3a. Send RIT ID to backend -> returns student info { first + last name } or error and telling them to log into shib
	2b. Open shib login
	3a. User is authenticated and server returns { first + last name}
 3. App now has student's name
 */

struct SessionView: View {
    
	@ObservedObject var session: CheckInSession
	@EnvironmentObject var sessionManager: SessionManager
	@StateObject private var errorManager = ErrorManager.shared
	
	
	var body: some View {
		VStack {
			HeaderView(session: sessionManager.currentSession)
			
			Spacer()
			
			switch session.phase {
				case .identification:
					InitialScreen()
				case .reasons:
					ReasonsScreen()
				case .advisors:
					MeetingHostScreen()
				case let .done(resolution):
					DoneScreen(resolution: resolution)
			}
			
			Spacer()
		}
		.environmentObject(session)
		.alert(item: $errorManager.alertItem) { alertItem in
			Alert(title: alertItem.title, message: alertItem.message, dismissButton: alertItem.dismissButton)
		}
		.onReceive(sessionManager.currentSession.idleTimer) { _ in
			sessionManager.tickTime()
		}
    }
}


struct ContentView_Previews: PreviewProvider {
	
	static var sessionManager = SessionManager()
	
    static var previews: some View {
		SessionView(session: sessionManager.currentSession)
			.environmentObject(sessionManager)
			.previewInterfaceOrientation(.landscapeLeft)
    }
}
