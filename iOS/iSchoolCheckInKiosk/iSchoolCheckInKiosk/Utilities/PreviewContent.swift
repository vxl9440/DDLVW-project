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
	
	static func getAdvisors() -> [Advisor] {
		[
			Advisor(name: "Advisor Name 1", picture: ""),
			Advisor(name: "Advisor Name 2", picture: "https://claws.rit.edu/photos/getphotoid.php?Client=Marketing&UN=jhsics&HASH=87b4406e0e7fdf6199ea08844b00b0265674148a&T=1633565631"),
			Advisor(name: "Advisor Name 3", picture: "https://claws.rit.edu/photos/getphotoid.php?Client=Marketing&UN=kmsrla&HASH=d7bdf02889dab165cd5c0039a117e555ca487cf9&T=1633565631"),
			Advisor(name: "Advisor Name 4", picture: "https://claws.rit.edu/photos/getphotoid.php?Client=Marketing&UN=ejhics&HASH=07941177917104e2424b19d745c726abc9ad3dff&T=1633565631"),
			Advisor(name: "Advisor Name 5 Super Long", picture: "https://claws.rit.edu/photos/getphotoid.php?Client=Marketing&UN=jsfrla&HASH=df735931d31203d4f5f7addfafc1135fc3c3d4f5&T=1633565630")
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
