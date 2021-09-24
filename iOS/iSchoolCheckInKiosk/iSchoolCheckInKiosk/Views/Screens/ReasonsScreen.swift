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
		Reason(name: "Class Drop", needsAppointment: true)
	]
	
	private let columns: [GridItem] = Array(repeating: .init(.flexible(minimum: 100, maximum: 400)), count: 3)
	
    var body: some View {
		VStack {
			Title("Please select up to two reaons for your visit.")
			
			ScrollView {
				LazyVGrid(columns: columns) {
					ForEach(reasons) { reason in
						ReasonView(reason: reason)
							.frame(height: ScreenSize.height * 0.1)
							.padding()
					}
				}
			}
			.padding(.horizontal)
			.overlay(NavControls(), alignment: .bottom)
			
			
		}
    }
}


struct NavControls: View {
	
	@EnvironmentObject var session: SessionManager
	
	let width  = CGFloat(180)
	let height = CGFloat(100)
	
	var body: some View {
		HStack {
			
			Button { session.goBack() } label: {
				HStack {
					Image(systemName: SFSymbols.arrowBackward)
					ButtonText("Back")
				}
				.frame(width: width, height: height)
			}
			
			Spacer()
			
			Button { session.proceed() } label: {
				HStack {
					ButtonText("Next")
					Image(systemName: SFSymbols.arrowForward)
				}
				.frame(width: width, height: height)
			}
		}
		.font(.title)
		.buttonStyle(RITButtonStyle())
		.padding(.horizontal, 60)
		.padding(.vertical, 40)
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
