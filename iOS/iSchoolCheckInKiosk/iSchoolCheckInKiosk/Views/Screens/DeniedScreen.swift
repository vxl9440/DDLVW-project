//
//  DeniedScreen.swift
//  DeniedScreen
//
//  Created by Lowell Pence on 9/3/21.
//

import SwiftUI

struct DeniedScreen: View {
	
	let reasonMessage: String
	@EnvironmentObject var sessionManager: SessionManager
	
	
    var body: some View {
		VStack {
			Text(reasonMessage)
				.padding(.horizontal, 100)
				.font(.system(size: 60))
				.multilineTextAlignment(.center)
				
			
			Button {
				sessionManager.reset()
			} label: {
				Text("OK")
					.font(.system(size: 40, weight: .semibold))
					.frame(width: 300)
			}
			.buttonStyle(.bordered)
			.controlSize(.large)
			.tint(.ritOrange)
		}
    }
}

struct DeniedScreen_Previews: PreviewProvider {
    static var previews: some View {
		DeniedScreen(reasonMessage: CheckInPhase.Resolution.DeniedReasons.reasonRequiresAppt.message())
			.previewInterfaceOrientation(.landscapeLeft)
    }
}
