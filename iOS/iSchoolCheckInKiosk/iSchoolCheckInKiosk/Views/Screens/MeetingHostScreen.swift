//
//  MeetingHostScreen.swift
//  MeetingHostScreen
//
//  Created by Lowell Pence on 9/3/21.
//

import SwiftUI

struct MeetingHostScreen: View {
	
	@EnvironmentObject var session: SessionManager
	
	private let columns: [GridItem] = Array(repeating: .init(.flexible(minimum: 220, maximum: 400)), count: 4)
	
	
	let advisors: [Advisor] = [
		Advisor(name: "First Last", picture: URL(string: "https://claws.rit.edu/photos/getphotoid.php?Client=Marketing&UN=sjzics&HASH=fde0c30cbca73f29895bb66f390d76190ae537af&T=1630690226"), isAvailable: true),
		Advisor(name: "First Last", picture: URL(string: "https://claws.rit.edu/photos/getphotoid.php?Client=Marketing&UN=sjzics&HASH=fde0c30cbca73f29895bb66f390d76190ae537af&T=1630690226"), isAvailable: true),
		Advisor(name: "First Last", picture: URL(string: "https://claws.rit.edu/photos/getphotoid.php?Client=Marketing&UN=sjzics&HASH=fde0c30cbca73f29895bb66f390d76190ae537af&T=1630690226"), isAvailable: true),
		Advisor(name: "Stephanie LongLastName", picture: URL(string: "https://claws.rit.edu/photos/getphotoid.php?Client=Marketing&UN=sjzics&HASH=fde0c30cbca73f29895bb66f390d76190ae537af&T=1630690226"), isAvailable: true),
		Advisor(name: "First Last Really Long", picture: URL(string: "https://claws.rit.edu/photos/getphotoid.php?Client=Marketing&UN=sjzics&HASH=fde0c30cbca73f29895bb66f390d76190ae537af&T=1630690226"), isAvailable: true)]
	
	//var advisors: [Advisor] = []
	
    var body: some View {
		VStack {
			Text("Select an advisor to meet with")
				.font(.system(size: 60))
			
			ScrollView {
				LazyVGrid(columns: columns) {
					ForEach(advisors) { advisor in
						Button {
							session.setSessionAdvisor(advisor)
							session.proceed()
						} label: {
							MeetingHostCell(advisor: advisor)
								.frame(height: 340)
						}
						.buttonStyle(.plain)
					}
				}
//				.task {
//					let n = NetworkManager()
//					advisors = n.fetchAvailableAdivsors()
//				}
			}
		}
    }
}


struct MeetingHostCell: View {
	
	let advisor: Advisor
	
	var body: some View {
		VStack {
			AsyncImage(url: advisor.picture!) { image in
				image.resizable()
			} placeholder: {
				ZStack {
					Color(uiColor: .systemGray5)
						
					Image(systemName: "person.fill")
						.font(.system(size: 80))
						.foregroundColor(.gray)
				}
				
			}
			.clipShape(Circle())
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
    }
}
