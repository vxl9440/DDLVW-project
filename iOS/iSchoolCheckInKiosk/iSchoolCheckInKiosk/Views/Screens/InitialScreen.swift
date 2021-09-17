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
			#if DEBUG
			Button("Simulate Card Swipe") {
				session.proceed()
			}
			#endif
			
			IdentificationScreen()
		}
	}
}


struct InitialScreen_Previews: PreviewProvider {
	static var previews: some View {
		InitialScreen()
			.previewInterfaceOrientation(.landscapeLeft)
			.environmentObject(CheckInSession())
	}
}
