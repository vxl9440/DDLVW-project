//
//  SessionManager.swift
//  iSchoolCheckInKiosk
//
//  Created by Lowell Pence on 9/17/21.
//

import Foundation

// responsible for initializing a new checkinSession and resetting them on a timer
class SessionManager: ObservableObject {
	
	// on init should contact server and get updated Reasons
	
	@Published var phase: CheckInPhase = .identification
	
	private var currentSession: CheckInSession?
	
	func startSession() {
		currentSession = CheckInSession()
	}
	
	func reset() {
		currentSession = nil
	}
	
	func proceed(happyPath: Bool = true) {
		phase = phase.proceed(happyPath: happyPath)
	}
	
	func goBack() {
		phase = phase.back
	}
	
	func setSessionAdvisor(_ advisor: Advisor) {
		currentSession?.advisor = advisor
	}
	
	func setSessionStudent(_ student: Student) {
		// maybe should init session with a student
		currentSession?.student = student
	}
}
