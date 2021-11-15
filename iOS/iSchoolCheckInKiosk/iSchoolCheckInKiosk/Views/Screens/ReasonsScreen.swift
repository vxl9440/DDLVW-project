//
//  ReasonsScreen.swift
//  ReasonsScreen
//
//  Created by Lowell Pence on 9/3/21.
//

import SwiftUI

struct ReasonsScreen: View {
	
	@State private var reasons: [Reason] = []
	
	private let columns: [GridItem] = Array(repeating: .init(.flexible(minimum: 100, maximum: 400)), count: 3)
	
    var body: some View {
		VStack {
			Title("Please select up to (\(Rules.maxReasons)) reaons for your visit.")
			
			ScrollView {
				if (reasons.isEmpty) { ProgressView("Loading Reasons") }
				LazyVGrid(columns: columns) {
					ForEach($reasons) { reason in
						ReasonView(reason: reason)
							.frame(height: ScreenSize.height * 0.1)
							.padding()
					}
				}
			}
			.padding(.horizontal)
			.overlay(NavControls(), alignment: .bottom)
		}
		.task { reasons = await NetworkManager.fetchReasons() }
    }
}


struct NavControls: View {
	
	@EnvironmentObject var session: CheckInSession
	
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
			
			Button { Task { await session.proceed() } } label: {
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
    static var previews: some View {
		ReasonsScreen()
			.previewInterfaceOrientation(.landscapeLeft)
			.environmentObject(SessionManager())
    }
}
