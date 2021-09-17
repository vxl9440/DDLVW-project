//
//  DeniedScreen.swift
//  DeniedScreen
//
//  Created by Lowell Pence on 9/3/21.
//

import SwiftUI

struct DeniedScreen: View {
	
	@EnvironmentObject var session: SessionManager
	
    var body: some View {
		VStack {
			Text("Due to your provided visit reasons, you will need to schedule an appointment and come back later.")
				.padding(.horizontal, 100)
				.font(.system(size: 60))
				.multilineTextAlignment(.center)
				
			
			Button {
				session.proceed()
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
        DeniedScreen()
			.previewInterfaceOrientation(.landscapeLeft)
    }
}
