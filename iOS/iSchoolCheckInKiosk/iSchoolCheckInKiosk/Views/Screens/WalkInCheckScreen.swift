//
//  WalkInCheckScreen.swift
//  iSchoolCheckInKiosk
//
//  Created by Lowell Pence on 9/17/21.
//

import SwiftUI

struct WalkInCheckScreen: View {
	
	@EnvironmentObject var session: CheckInSession
	
    var body: some View {
		VStack {
			Title("Welcome, \(session.studentName).")
			
			BodyText("Do you have a scheduled appointment?")
			
			Button { session.proceed() } label: {
				MainButtonContent(textColor: .white, title: "YES")
			}
			.padding()
			
			Button { session.proceed(happyPath: false) } label: {
				MainButtonContent(textColor: .white, title: "NO (Walk-In)")
			}
			.padding()
		
			CaptionText("Note: Walk-in meetings are limited to 15 minutes.")
				
		}
		.buttonStyle(RITButtonStyle())
    }
}

fileprivate struct MainButtonContent: View {
	
	var textColor: Color = .white
	let title: String
	
	var body: some View {
		Text(title)
			.frame(width: 600, height: 100)
			.font(.system(size: 40, weight: .semibold, design: .rounded))
			.foregroundColor(textColor)
	}
}

struct WalkInCheckScreen_Previews: PreviewProvider {
    static var previews: some View {
        WalkInCheckScreen()
			.previewInterfaceOrientation(.landscapeLeft)
    }
}
