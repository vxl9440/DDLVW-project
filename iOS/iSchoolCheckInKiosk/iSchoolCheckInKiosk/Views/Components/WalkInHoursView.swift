//
//  WalkInHoursView.swift
//  iSchoolCheckInKiosk
//
//  Created by Lowell Pence on 10/25/21.
//

import SwiftUI

extension Array where Element == Advisor {
	func withHours() -> [Advisor] {
		return self.filter { $0.walkInHours != nil }
	}
}

struct WalkInHoursView: View {
	
	let advisors: [Advisor]
	
    var body: some View {
		VStack(alignment: .leading) {
			BodyText("Current Walk In Hours")
				.padding()
			ScrollView {
				ForEach(advisors.withHours()) { advisor in
					AdvisorScheduleCell(advisor: advisor)
				}
			}
		}
		.background(Color(uiColor: .systemGray6))
		.cornerRadius(14)
		.padding()
    }
}

struct AdvisorScheduleCell: View {
	
	let advisor: Advisor
	
	var body: some View {
		HStack {
			Photo.padding()
			Hours
		}
		.background(Color.white)
		.cornerRadius(20)
		.padding()
	}
	
	var Photo: some View {
		ProfilePicture(url: URL(string: advisor.picture))
			.frame(width: 50, height: 50)
	}
	
	var Hours: some View {
		VStack(alignment: .leading) {
			Text(advisor.name)
			ForEach(advisor.walkInHours ?? []) { hours in
				HStack {
					Text(hours.weekday)
					Text(hours.startTime)
					Text(" - ")
					Text(hours.endTime)
				}
			}
		}
		.padding()
	}
	
}

struct WalkInHoursView_Previews: PreviewProvider {
    static var previews: some View {
		WalkInHoursView(advisors: PreviewContent.getAdvisors())
.previewInterfaceOrientation(.landscapeLeft)
    }
}
