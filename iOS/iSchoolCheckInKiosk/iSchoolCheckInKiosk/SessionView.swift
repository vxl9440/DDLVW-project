//
//  ContentView.swift
//  iSchoolCheckInKiosk
//
//  Created by Lowell Pence on 9/1/21.
//

import SwiftUI


struct SessionView: View {
    
	// TODO: Initialize a session for each iteration of a session
	// when form resets, nullify session and wait for action before creating the next one
	@StateObject private var sessionManager = SessionManager()
	
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
    }
}


struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        SessionView()
			.previewInterfaceOrientation(.landscapeLeft)
    }
}
