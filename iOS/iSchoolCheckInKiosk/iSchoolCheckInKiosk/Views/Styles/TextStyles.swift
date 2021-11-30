//
//  Title.swift
//  iSchoolCheckInKiosk
//
//  Created by Lowell Pence on 9/23/21.
//

import SwiftUI

// I started making these Text style wrapper views, but they aren't used everywhere. I didn't have enough
// time to full decide if I liked this approach or not.

struct Title: View {
	
	let text: String
	
	init(_ text: String) { self.text = text }
	
    var body: some View {
		Text(text)
			.font(.custom(Font.primary, size: 40, relativeTo: .largeTitle))
			.padding()
    }
}


struct ButtonText: View {
	let text: String
	
	init(_ text: String) { self.text = text }
	
	var body: some View {
		Text(text)
			.font(.custom(Font.primary, size: 28, relativeTo: .body))
			.fontWeight(.medium)
	}
}


struct BodyText: View {
	
	let text: String
	
	init(_ text: String) { self.text = text }
	
	var body: some View {
		Text(text)
			.font(.custom(Font.primary, size: 30, relativeTo: .body))
	}
}


struct CaptionText: View {
	
	let text: String
	
	init(_ text: String) { self.text = text }
	
	var body: some View {
		Text(text)
			.font(.custom(Font.primary, size: 20, relativeTo: .caption))
	}
}


struct TextStyle_Previews: PreviewProvider {
    static var previews: some View {
		VStack {
			Title("Title text")
			BodyText("Body text")
			CaptionText("Caption text")
		}
    }
}
