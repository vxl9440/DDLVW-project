//
//  ReasonView.swift
//  ReasonView
//
//  Created by Lowell Pence on 9/3/21.
//

import SwiftUI

struct ReasonView: View {
	
	@Binding var reason: Reason
	@EnvironmentObject var session: CheckInSession
	@State private var selected = false
	
	private var color: Color { session.reasonIsSelected(reason) ? .ritOrange : .white }
	private var textColor: Color { session.reasonIsSelected(reason) ? .white : .black }
	
	
	var body: some View {
		Button { selected = session.addReason(reason) } label: {
			BodyText(reason.name)
		}
		.buttonStyle(ReasonButtonStyle(color: color, textColor: textColor))
		.controlSize(.large)
		.cornerRadius(10)
		.shadow(radius: 10)
	}
}


struct ReasonButtonStyle: ButtonStyle {
	
	let color: Color
	let textColor: Color
	
	func makeBody(configuration: Self.Configuration) -> some View {
		ZStack {
			RoundedRectangle(cornerRadius: 15)
				.foregroundColor(color)
			
			configuration.label
				.padding(.horizontal)
				.truncationMode(.tail)
				.lineLimit(3)
				.multilineTextAlignment(.center)
				.minimumScaleFactor(0.5)
				.foregroundColor(textColor)
		}
		.scaleEffect(configuration.isPressed ? 0.9 : 1)
	}
}


struct ReasonView_Previews: PreviewProvider {
    static var previews: some View {
		ReasonView(reason: .constant(Reason(id: 1, name: "Class Drop", needsAppt: true)))
			.frame(width: 180, height: 100)
    }
}
