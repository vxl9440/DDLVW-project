//
//  PreviewContent.swift
//  iSchoolCheckInKiosk
//
//  Created by Lowell Pence on 9/25/21.
//

import Foundation

enum PreviewContent {
	static func getReasons() -> [Reason] {
		ReasonNames.names.map { Reason(id: Int.random(in: 1...10000), name: $0, needsAppt: true) }
	}

	static func getAdvisors() -> [Advisor] {
		[
			Advisor(id: 1,
					firstName: "John",
					middleName: "",
					lastName: "Doe",
					email: "jxd4567",
					portraitURL: "https://claws.rit.edu/photos/getphotoid.php?Client=Marketing&UN=jhsics&HASH=87b4406e0e7fdf6199ea08844b00b0265674148a&T=1633565631",
					walkInHours: [
						WalkInHours(id: 1, startTime: "10:00", endTime: "11:30", weekday: "MON"),
						WalkInHours(id: 2, startTime: "12:00", endTime: "13:00", weekday: "THU")
					])
		]
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
