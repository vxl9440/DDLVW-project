//
//  DoneScreen.swift
//  iSchoolCheckInKiosk
//
//  Created by Lowell Pence on 10/24/21.
//

import SwiftUI

struct DoneScreen: View {
	
	var resolution: CheckInPhase.Resolution
	
    var body: some View {
		switch resolution {
			case let .denied(reason):
				DeniedScreen(reasonMessage: reason.message())
			case .confirmed:
				ConfirmationScreen()
		}
    }
}
