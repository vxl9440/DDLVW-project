//
//  Constants.swift
//  Constants
//
//  Created by Lowell Pence on 9/3/21.
//

import SwiftUI

enum SFSymbols {
	static let check         = "checkmark"
	static let x             = "xmark"
	static let arrowForward  = "chevron.forward"
	static let arrowBackward = "chevron.backward"
	static let student       = "graduationcap"
	static let person        = "person"
	static let calendar      = "calendar.badge.clock"
	static let card          = "lanyardcard"
}


enum Font {
	static let primary = "Helvetica Neue"
}


extension Color {
	static let ritOrange = Color("ritOrange")
	static let ritRed    = Color("ritRed")
	static let ritGreen  = Color("ritGreen")
}


enum ScreenSize {
	static let width                 = UIScreen.main.bounds.size.width
	static let height                = UIScreen.main.bounds.size.height
	static let maxLength             = max(ScreenSize.width, ScreenSize.height)
	static let minLength             = min(ScreenSize.width, ScreenSize.height)
}



