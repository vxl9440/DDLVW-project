//
//  PreviewContent.swift
//  iSchoolCheckInKiosk
//
//  Created by Lowell Pence on 9/25/21.
//

import Foundation

enum PreviewContent {
	static func getReasons() -> [Reason] {
		ReasonNames.names.map { Reason(name: $0, needsAppointment: true) }
	}
}


fileprivate enum ReasonNames {
	static let names = [
		"Academic Advising: Freshman/ Transfer",
		"Academic Advising: Mid-Degree",
		"Academic Advising: Second Year",
		"Academic Planning / Registration",
		"Academic Success / Support",
		"Considering Change of Major",
		"Considering Course Withdrawal",
		"Co-Op/Internship/Study Abroad",
		"Personal Concerns"
	]
}
