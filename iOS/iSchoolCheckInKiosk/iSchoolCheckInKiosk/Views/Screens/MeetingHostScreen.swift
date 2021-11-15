//
//  MeetingHostScreen.swift
//  MeetingHostScreen
//
//  Created by Lowell Pence on 9/3/21.
//

import SwiftUI

struct MeetingHostScreen: View {
	
	@EnvironmentObject var session: CheckInSession
	@State private var advisors: [Advisor] = []
	@State private var isLoading = false
	
	private let columns: [GridItem] = Array(repeating: .init(.flexible(minimum: 220, maximum: 400)), count: 4)
	
	
    var body: some View {
		VStack {
			Text("Select an advisor to meet with")
				.font(.system(size: 60))
			
			ScrollView {
				if isLoading {
					ProgressView()
				}
				
				LazyVGrid(columns: columns) {
					ForEach(advisors) { advisor in
						Button {
							Task {
								await session.selectAdvisor(advisor)
							}
						} label: {
							MeetingHostCell(advisor: advisor)
								.frame(height: 340)
						}
						.buttonStyle(.plain)
					}
				}
				.task {
					isLoading = true
					advisors  = await session.getAvailableAdvisors()
					isLoading = false
				}
			}
		}
    }
}


struct MeetingHostCell: View {
	
	let advisor: Advisor
	
	var body: some View {
		VStack {
			ProfilePicture(url: URL(string: advisor.picture))
				.frame(width: 220, height: 220)
			
			Text(advisor.name)
				.font(.largeTitle)
				.lineLimit(2)
				.multilineTextAlignment(.center)
				.frame(width: 200)
				.minimumScaleFactor(0.5)
			
			Spacer()
		}
	}
}


struct MeetingHostScreen_Previews: PreviewProvider {
    static var previews: some View {
        MeetingHostScreen()
			.previewInterfaceOrientation(.landscapeLeft)
			.environmentObject(CheckInSession())
    }
}
