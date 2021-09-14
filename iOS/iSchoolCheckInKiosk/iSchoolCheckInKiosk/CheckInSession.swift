//
//  CheckInSession.swift
//  CheckInSession
//
//  Created by Lowell Pence on 9/5/21.
//

import Foundation

class CheckInSession: ObservableObject {
	
	@Published var reasons: [Reason]   = []
	@Published var student: Student?   = nil
	@Published var advisor: Advisor?   = nil
	
	let dateTime = Date()
	
}

// responsible for initializing a new checkinSession and resetting them on a timer
class SessionManager: ObservableObject {
	
	// on init should contact server and get updated Reasons
	
	@Published var phase: CheckInPhase = .initial
	
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


enum CheckInPhase {
	case initial, identification, reasons, denied, advisors, confirmation
	
	func proceed(happyPath: Bool = true) -> CheckInPhase {
		switch self {
			case .initial:
				return happyPath ? .identification : .reasons
			case .identification, .advisors:
				return .confirmation
			case .reasons:
				return happyPath ? .advisors : .denied
			case .denied, .confirmation:
				return .initial
		}
	}
	
	var back: CheckInPhase {
		switch self {
			case .initial, .identification, .denied, .confirmation:
				return .initial
			case .reasons:
				return .identification
			case .advisors:
				return .reasons
		}
	}
}
