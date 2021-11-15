//
//  Model.swift
//
//  Created by Lowell Pence on 9/2/21.
//

import Foundation


struct Advisor: Identifiable, Decodable {
	let id: Int
	let firstName: String?
	let middleName: String?
	let lastName: String?
	let email: String?
	let portraitURL: String?
	let walkInHours: [WalkInHours]?
}


extension Advisor {
	
	var wrappedEmail: String { email ?? "" }
	
	var picture: String { portraitURL ?? "" }
	
	var name: String {
		PersonNameComponents(givenName: firstName, middleName: middleName, familyName: lastName)
			.formatted(.name(style: .medium))
	}
}


struct WalkInHours: Identifiable, Decodable {
	let id: Int
	let startTime: String
	let endTime: String
	let weekday: String
	
	var start: String { startTime.to12HrTime }
	var end: String { endTime.to12HrTime }
}


struct Student: Identifiable, Decodable {
	let id = UUID()
	let studentName: String?
	let studentUsername: String
	let appointment: Appointment?
	
	var hasAppt: Bool {
		return appointment != nil
	}
	
	private enum CodingKeys: String, CodingKey {
		case studentName, studentUsername, appointment
	}
}


struct Appointment: Decodable {
	let advisorName: String
	let startTime: String
	let endTime: String
}


struct Reason: Identifiable, Hashable, Decodable {
	let id: Int
	let name: String
	let needsAppt: Bool
}


struct Registration: Encodable {
	let studentName: String
	let username: String
	let appointment: Bool
	let reasons: [Int]
	let meetingHost: Int
	let timeIn: String
}
