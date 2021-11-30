//
//  ContentView.swift
//  iSchoolCheckInKiosk
//
//  Created by Lowell Pence on 9/1/21.
//

import SwiftUI

// Root view for the app
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
		.onReceive(sessionManager.currentSession.idleTimer) { _ in sessionManager.tickTime() }
		
		// Shows an alert when an alert is published to the error manager
		.alert(item: $errorManager.alertItem) { alertItem in
			Alert(title: alertItem.title, message: alertItem.message, dismissButton: alertItem.dismissButton)
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
