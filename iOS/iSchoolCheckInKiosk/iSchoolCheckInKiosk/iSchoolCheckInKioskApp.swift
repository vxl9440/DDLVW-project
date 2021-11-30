//
//  iSchoolCheckInKioskApp.swift
//  iSchoolCheckInKiosk
//
//  Created by Lowell Pence on 9/1/21.
//

import SwiftUI

@main
struct iSchoolCheckInKioskApp: App {
	
	// Lasts for the duration of the App's lifecycle
	@StateObject var sessionManager = SessionManager()
	
    var body: some Scene {
        WindowGroup {
			SessionView(session: sessionManager.currentSession)
				.environmentObject(sessionManager)
        }
    }
}
