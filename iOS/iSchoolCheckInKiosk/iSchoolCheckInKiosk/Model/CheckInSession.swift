//
//  CheckInSession.swift
//  CheckInSession
//
//  Created by Lowell Pence on 9/5/21.
//

import Foundation

class CheckInSession: ObservableObject {
	
	@Published var reasons = Set<Reason>()
	@Published var student: Student? = nil
	@Published var advisor: Advisor? = nil
	
	let dateTime = Date()
	
	func addReason(_ reason: Reason) {
		
	}
	
}
