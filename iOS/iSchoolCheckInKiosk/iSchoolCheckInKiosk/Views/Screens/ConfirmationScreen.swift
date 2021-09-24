//
//  ConfirmationScreen.swift
//  ConfirmationScreen
//
//  Created by Lowell Pence on 9/3/21.
//

import SwiftUI

struct ConfirmationScreen: View {
	
	@EnvironmentObject var session: SessionManager
	
    var body: some View {
		VStack {
			HStack() {
				
				VStack {
					Image(systemName: SFSymbols.check)
						.symbolVariant(.circle.fill)
						.foregroundColor(.ritGreen)
						.font(.system(size: 160))
					
					Text("You are checked in.")
						.font(.system(.largeTitle, design: .rounded))
						.padding(.bottom)
					
					Text("Please wait to be greeted by ")
						.font(.custom(Font.primary, size: 20))
				}.padding()
				
				VStack(alignment: .leading, spacing: 0) {
					ConfirmationItem(icon: SFSymbols.student, content: "John Doe")
					ConfirmationItem(icon: SFSymbols.person, content: "Jim Krynd")
					ConfirmationItem(icon: SFSymbols.calendar, content: "10:00 - 10:15")
				}
				.padding()
			}
			
			Button{} label: {
				Text("OK")
					.font(.custom(Font.primary, size: 40))
					.padding(.horizontal, 50)
					.padding(.vertical)
			}
			.buttonStyle(RITButtonStyle())
			.padding()
		}
    }
}


struct ConfirmationItem: View {
	let icon: String
	let content: String
	
	var body: some View {
		HStack {
			Image(systemName: icon).frame(width: 100, height: 100)
				.symbolVariant(.fill)
				.foregroundColor(.ritOrange)
			
			Text(content).font(.custom(Font.primary, size: 40, relativeTo: .caption))
		}
		.font(.system(size: 40))
	}
}

struct ConfirmationScreen_Previews: PreviewProvider {
    static var previews: some View {
        ConfirmationScreen()
			.previewInterfaceOrientation(.landscapeLeft)
			.environmentObject(CheckInSession())
    }
}
