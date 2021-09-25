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
    
	// TODO: Initialize a session for each iteration of a session
	// when form resets, nullify session and wait for action before creating the next one
	@StateObject private var sessionManager = SessionManager()
	@StateObject private var errorManager   = ErrorManager.shared
	
	var body: some View {
		VStack {
			HeaderView()
			
			Spacer()
			
			switch sessionManager.phase {
				case .identification:
					InitialScreen()
				case .appointmentType:
					WalkInCheckScreen()
				case .reasons:
					ReasonsScreen()
				case .denied:
					DeniedScreen()
				case .advisors:
					MeetingHostScreen()
				case .confirmation:
					ConfirmationScreen()
			}
			
			Spacer()
		}
		.environmentObject(sessionManager)
		.alert(item: $errorManager.alertItem) { alertItem in
			Alert(title: alertItem.title, message: alertItem.message, dismissButton: alertItem.dismissButton)
		}
    }
}


struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        SessionView()
			.previewInterfaceOrientation(.landscapeLeft)
    }
}
