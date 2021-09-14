//
//  InitialScreen.swift
//  InitialScreen
//
//  Created by Lowell Pence on 9/3/21.
//

import SwiftUI

struct InitialScreen: View {
	
	@EnvironmentObject var session: SessionManager
	
    var body: some View {
		VStack {
			Text("Do you have a scheduled appointment?")
				.font(.system(size: 60))
			
			
				Button { session.proceed() } label: {
					MainButtonContent(textColor: .white, title: "YES")
				}
				.padding()
				
			
				Button { session.proceed(happyPath: false) } label: {
					MainButtonContent(textColor: .white, title: "NO (Walk-In)")
				}
				.padding()
				
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


struct InitialScreen_Previews: PreviewProvider {
    static var previews: some View {
        InitialScreen()
			.previewInterfaceOrientation(.landscapeLeft)
			.environmentObject(CheckInSession())
    }
}
