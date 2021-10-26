//
//  SessionManager.swift
//  iSchoolCheckInKiosk
//
//  Created by Lowell Pence on 9/17/21.
//

import Foundation

// responsible for initializing a new checkinSession and resetting them on a timer
@MainActor
final class SessionManager: ObservableObject {
	
	// Published to register changes when the session is reset
	@Published private(set) var currentSession = CheckInSession()
	
	let inputHandler = StudentIDHandler()

	func fetchStudent(id studentID: String) async {
		if let student = await NetworkManager.fetchStudent(id: studentID) {
			currentSession.student = student
			currentSession.proceed()
		} else {
			ErrorManager.shared.presentAlert(AlertContext.identificationError)
			reset()
		}
	}

	
	func tickTime() {
		if currentSession.phase != .identification {
			if currentSession.timeRemaining > 0 {
				currentSession.timeRemaining -= 1
			} else {
				reset()
			}
		}
	}
	
	
	func reset() {
		currentSession = CheckInSession()
	}
}
