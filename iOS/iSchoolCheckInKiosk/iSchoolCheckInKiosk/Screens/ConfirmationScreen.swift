//
//  ConfirmationScreen.swift
//  ConfirmationScreen
//
//  Created by Lowell Pence on 9/3/21.
//

import SwiftUI

struct Card: ViewModifier {
	
	@Environment(\.colorScheme) private var colorScheme
	
	private let width: CGFloat? = 1000
	private let cornerRadius: Double = 15
	private var height: CGFloat? = 800
	
	func body(content: Content) -> some View {
		content
			.padding()
			.frame(width: width, height: height, alignment: .top)
			.cornerRadius(cornerRadius)
			.clipped()
			.background(
				RoundedRectangle(cornerRadius: cornerRadius)
					.fill(.white)
					.shadow(radius: 15)
			)
		
	}
}


struct ConfirmationScreen: View {
	
	@EnvironmentObject var session: SessionManager
	
    var body: some View {
		VStack {
			
			Image(systemName: SFSymbols.check)
				.symbolVariant(.circle.fill)
				.foregroundColor(.green)
				.font(.system(size: 160))
			
			Text("You are checked in.")
				.font(.system(.largeTitle, design: .rounded))
				.padding(.bottom)
			
			VStack(alignment: .leading, spacing: 0) {
				ConfirmationItem(icon: SFSymbols.student, content: "John Doe")
				ConfirmationItem(icon: SFSymbols.person, content: "Jim Krynd")
				ConfirmationItem(icon: SFSymbols.calendar, content: "10:00 - 10:15")
			}
			
			Button{} label: {
				Text("OK")
					.font(.system(size: 40))
					.padding(.horizontal, 50)
					.padding(.vertical)
			}.buttonStyle(RITButtonStyle())
		}
		.modifier(Card())
    }
}


struct ConfirmationItem: View {
	let icon: String
	let content: String
	
	var body: some View {
		HStack {
			Image(systemName: icon).frame(width: 120, height: 120)
				.symbolVariant(.fill)
				.foregroundColor(.ritOrange)
			
			Text(content)
		}
		.font(.system(size: 60))
	}
}

struct ConfirmationScreen_Previews: PreviewProvider {
    static var previews: some View {
        ConfirmationScreen()
			.previewInterfaceOrientation(.landscapeLeft)
			.environmentObject(CheckInSession())
    }
}
