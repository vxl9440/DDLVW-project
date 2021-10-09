//
//  CheckInSession.swift
//  CheckInSession
//
//  Created by Lowell Pence on 9/5/21.
//

import Foundation

@MainActor
final class CheckInSession: ObservableObject {
	
	@Published var reasons: Set<Reason> = []
	@Published var student: Student?    = nil
	@Published var advisor: Advisor?    = nil
	@Published var phase: CheckInPhase  = .identification
	
	
	lazy var dateTime = { Date() }()
	
	
	var studentName: String {
		student?.studentName ?? ""
	}
	
	
	var advisorName: String {
		advisor?.name ?? "No Advisor"
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
	
	
	func proceed(happyPath: Bool = true) {
		phase = phase.proceed(happyPath: happyPath)
	}
	
	
	func goBack() {
		phase = phase.back
	}
	
	
	func getAvailableAdvisors() async -> [Advisor] {
		await NetworkManager.fetchAvailableAdivsors()
	}
	
	
	func selectAdvisor(_ advisor: Advisor) {
		self.advisor = advisor
		proceed()
	}
	
	
	func reasonIsSelected(_ reason: Reason) -> Bool {
		return reasons.contains(reason)
	}
}
