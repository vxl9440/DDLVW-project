//
//  ReasonsScreen.swift
//  ReasonsScreen
//
//  Created by Lowell Pence on 9/3/21.
//

import SwiftUI

struct ReasonsScreen: View {
	
	@EnvironmentObject var session: CheckInSession
	
	let reasons: [Reason] = [
		Reason(name: "Class Drop", needsAppointment: true),
		Reason(name: "Class Drop", needsAppointment: true),
		Reason(name: "Class Drop", needsAppointment: true),
		Reason(name: "Class Drop", needsAppointment: true),
		Reason(name: "Class Drop", needsAppointment: true),
		Reason(name: "Class Drop", needsAppointment: true),
		Reason(name: "Class Drop", needsAppointment: true),
		Reason(name: "Class Drop", needsAppointment: true),
		Reason(name: "Class Drop", needsAppointment: true),
		Reason(name: "Class Drop", needsAppointment: true),
		Reason(name: "Class Drop", needsAppointment: true),
		Reason(name: "Class Drop", needsAppointment: true),
		Reason(name: "Class Drop", needsAppointment: true),
		Reason(name: "Class Drop", needsAppointment: true),
		Reason(name: "Class Drop", needsAppointment: true),
		Reason(name: "Class Drop", needsAppointment: true),
		Reason(name: "Class Drop", needsAppointment: true),
		Reason(name: "Class Drop", needsAppointment: true),
		Reason(name: "Class Drop", needsAppointment: true)
	]
	
	private let columns: [GridItem] = Array(repeating: .init(.flexible(minimum: 100, maximum: 400)), count: 3)
	
    var body: some View {
		VStack {
			Text("Please select all reasons for your visit today.")
				.font(.system(size: 60))
			
			ScrollView {
				LazyVGrid(columns: columns) {
					ForEach(reasons) { reason in
						ReasonView(reason: reason)
							.frame(height: 100)
							.padding()
					}
				}
			}
			.padding(.horizontal)
			
			NavControls()
		}
    }
}


struct NavControls: View {
	
	@EnvironmentObject var session: SessionManager
	
	var body: some View {
		HStack {
			Button { session.goBack() } label: {
				HStack {
					Image(systemName: SFSymbols.arrowBackward)
					Text("Back")
				}
				.frame(width: 200, height: 100)
				.font(.largeTitle)
			}
			
			Spacer()
			
			Button { session.proceed() } label: {
				HStack {
					Text("Next")
					Image(systemName: SFSymbols.arrowForward)
				}
				.frame(width: 200, height: 100)
				.font(.largeTitle)
			}
			
		}
		.buttonStyle(RITButtonStyle())
		.padding(.horizontal, 100)
		.padding(.vertical, 20)
	}
}


struct RITButtonStyle: ButtonStyle {
	func makeBody(configuration: Self.Configuration) -> some View {
		configuration.label
			.foregroundColor(.white)
			.background(
				RoundedRectangle(cornerRadius: 16)
					.foregroundColor(.ritOrange)
			)
	}
}


struct ReasonsScreen_Previews: PreviewProvider {
	
	static let reasons = [
		Reason(name: "Class Drop", needsAppointment: true),
		Reason(name: "Class Drop", needsAppointment: true),
		Reason(name: "Class Drop", needsAppointment: true),
		Reason(name: "Class Drop", needsAppointment: true),
		Reason(name: "Class Drop", needsAppointment: true),
		Reason(name: "Class Drop", needsAppointment: true),
		Reason(name: "Class Drop", needsAppointment: true),
		Reason(name: "Class Drop", needsAppointment: true),
		Reason(name: "Class Drop", needsAppointment: true),
		Reason(name: "Class Drop", needsAppointment: true),
		Reason(name: "Class Drop", needsAppointment: true),
		Reason(name: "Class Drop", needsAppointment: true),
		Reason(name: "Class Drop", needsAppointment: true),
		Reason(name: "Class Drop", needsAppointment: true),
		Reason(name: "Class Drop", needsAppointment: true),
		Reason(name: "Class Drop", needsAppointment: true),
		Reason(name: "Class Drop", needsAppointment: true),
		Reason(name: "Class Drop", needsAppointment: true),
		Reason(name: "Class Drop", needsAppointment: true)
	]
	
	
    static var previews: some View {
		ReasonsScreen()
			.previewInterfaceOrientation(.landscapeLeft)
    }
}
