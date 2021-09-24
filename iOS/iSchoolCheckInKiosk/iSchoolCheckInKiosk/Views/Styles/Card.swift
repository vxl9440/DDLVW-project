//
//  Card.swift
//  iSchoolCheckInKiosk
//
//  Created by Lowell Pence on 9/23/21.
//

import SwiftUI

struct Card: ViewModifier {
	
	//@Environment(\.colorScheme) private var colorScheme
	
	var cornerRadius: Double = 15
	var width: CGFloat? = 1000
	var height: CGFloat? = 800
	
	func body(content: Content) -> some View {
		content
			.padding()
			.frame(width: width, height: height, alignment: .top)
			.cornerRadius(cornerRadius)
			.clipped()
			.background(
				RoundedRectangle(cornerRadius: cornerRadius)
					.fill(.white)
					.shadow(radius: 15)
			)
		
	}
}
