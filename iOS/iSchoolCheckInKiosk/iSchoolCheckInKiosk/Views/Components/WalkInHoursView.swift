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
			Title("Current Walk In Hours")
				.padding()
			
			ScrollView {
				ForEach(advisors.withHours()) { advisor in
					AdvisorScheduleCell(advisor: advisor)
				}
			}
		}
		.background(Color(uiColor: .systemGray6))
		.cornerRadius(14)
		.padding([.bottom, .horizontal], 40)
    }
}

struct AdvisorScheduleCell: View {
	
	let advisor: Advisor
	
	var body: some View {
		HStack {
			Photo
			Hours
		}
		.padding()
		.background(Color.white)
		.cornerRadius(20)
		.padding()
	}
	
	var Photo: some View {
		ProfilePicture(url: URL(string: advisor.picture))
			.frame(width: 80, height: 80)
	}
	
	var Hours: some View {
		VStack(alignment: .leading, spacing: 10) {
			Text(advisor.name)
				.font(.custom(Font.primary, size: 30).bold())
			
			ForEach(advisor.walkInHours ?? []) { hours in
				HStack {
					Text(hours.weekday)
					Text(hours.start)
					Text("-")
					Text(hours.end)
				}.font(.custom(Font.primary, size: 26))
			}
		}
		.padding()
	}
	
}

//struct WalkInHoursView_Previews: PreviewProvider {
//    static var previews: some View {
//		WalkInHoursView(advisors: PreviewContent.getAdvisors())
//.previewInterfaceOrientation(.landscapeLeft)
//    }
//}
