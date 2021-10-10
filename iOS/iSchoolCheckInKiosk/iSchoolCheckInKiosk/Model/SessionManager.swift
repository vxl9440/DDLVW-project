//
//  SessionManager.swift
//  iSchoolCheckInKiosk
//
//  Created by Lowell Pence on 9/17/21.
//

import SwiftUI
import Combine

// responsible for initializing a new checkinSession and resetting them on a timer
@MainActor
final class SessionManager: ObservableObject {
	
	// Published to register changes when the session is reset
	@Published private(set) var currentSession = CheckInSession()
	@Published private(set) var timeRemaining  = 90
	
	let idleTimer    = Timer.publish(every: 1, on: .main, in: .common).autoconnect()
	let inputHandler = StudentIDHandler()

	
	func fetchStudent(id studentID: String) async {
		print("Fetching student with ID: \(studentID)")
		if let student = await NetworkManager.fetchStudent(id: studentID) {
			currentSession.student = student
			currentSession.proceed()
		} else {
			ErrorManager.shared.presentAlert(AlertContext.identificationError)
			reset()
		}
	}
	
	
	func reset() {
		currentSession = CheckInSession()
	}
}
