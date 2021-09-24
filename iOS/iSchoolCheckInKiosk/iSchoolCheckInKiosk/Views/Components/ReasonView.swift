//
//  ReasonView.swift
//  ReasonView
//
//  Created by Lowell Pence on 9/3/21.
//

import SwiftUI

struct ReasonView: View {
	
	@State var reason: Reason = Reason(name: "Add / Drop", needsAppointment: true)
	
	private var color: Color { reason.selected ? .ritOrange : .white }
	private var textColor: Color { reason.selected ? .white : .black }
	
	
	var body: some View {
		Button { reason.selected.toggle() } label: {
			ButtonText(reason.name)
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
		ReasonView().frame(width: 180, height: 100)
    }
}
