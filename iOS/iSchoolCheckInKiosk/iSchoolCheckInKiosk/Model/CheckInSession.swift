//
//  CheckInSession.swift
//  CheckInSession
//
//  Created by Lowell Pence on 9/5/21.
//

import Foundation
import Combine

@MainActor
final class CheckInSession: ObservableObject {
	
	@Published var reasons: Set<Reason> = []
	@Published var student: Student?    = nil
	@Published var advisor: Advisor?    = nil
	@Published var phase: CheckInPhase  = .identification
	@Published var timeRemaining: Int   = 40
	
	
	let idleTimer = Timer.publish(every: 1, on: .main, in: .common)

	private var timerSubscription: AnyCancellable? = nil
	
	lazy var dateTime = { Date() }()
	
	
	var studentName: String {
		student?.studentName ?? ""
	}
	
	
	var advisorName: String {
		advisor?.name ?? "No Advisor"
	}
	
	
	func startTimer() {
		timerSubscription = idleTimer.connect() as? AnyCancellable
	}
	
	
	func addReason(_ reason: Reason) -> Bool {
		if reasons.contains(reason) {
			reasons.remove(reason)
			return false
		} else if reasons.count < Rules.maxReasons {
			return reasons.insert(reason).inserted
		} else {
			return false
		}
	}
	

	func proceed() {
		if phase == .identification {
			startTimer()
		} else {
			resetTimeout()
		}
		
		if student?.appointment != nil {
			phase = .done(.confirmed)
		} else if phase == .advisors {
			phase = .reasons
		} else if phase == .reasons {
			// check if reasons contains a requires appointment reason
			if (reasons.contains(where: { $0.needsAppt })) {
				phase = .done(.denied)
			} else {
				phase = .done(.confirmed)
			}
		} else {
			phase = .advisors
		}
	}
	
	
	func goBack() {
		resetTimeout()
		
		if phase == .reasons {
			phase = .advisors
		}
	}
	
	
	func getAvailableAdvisors() async -> [Advisor] {
		let advisors = await NetworkManager.fetchAvailableAdivsors()
		if advisors.isEmpty {
			// TODO: Present alert
			print(advisors)
		}
		
		return advisors
	}
	
	
	func selectAdvisor(_ advisor: Advisor) {
		self.advisor = advisor
		proceed()
	}
	
	
	func reasonIsSelected(_ reason: Reason) -> Bool {
		return reasons.contains(reason)
	}
	
	
	func resetTimeout() {
		timeRemaining = 40
	}
}
