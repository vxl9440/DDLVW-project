//
//  IdentificationScreen.swift
//  IdentificationScreen
//
//  Created by Lowell Pence on 9/3/21.
//

import SwiftUI




struct IdentificationScreen: View {
	
	/**
	 IDEAS
	 - When the student swipes ID and an ID was retrieved, do an animation on the card image
	 - If they log in thru web, will need a way to get the response and then dismiss and proceed
	 
	 REQUIREMENTS
	 - Need a card reader to test with
	 - If it acts as a keyboard: https://developer.apple.com/documentation/uikit/mac_catalyst/handling_key_presses_made_on_a_physical_keyboard
	 */
	
	@State private var isShowingWebView = false
	@State private var studentID = ""
	@FocusState private var focus
	
	
    var body: some View {
		let id_binding = Binding<String>(get: { studentID }, set: {
			studentID = $0
			if (studentID.isValidRITidFormat) {
				//NetworkManager().fetchStudent(id: studentID)
				print("Firing network request...")
			}
		})
		
		
		VStack {
			Button("Focus") { focus = true }
			TextField("Student UID", text: id_binding)
				.focused($focus).hidden()
			
			IDCardGraphic().rotationEffect(.degrees(20))
				
			Text("Please swipe your RIT ID")
				.font(.custom(Font.primary, size: 40)).bold().padding()
			
			VStack(spacing: 10) {
				Text("Don't have your ID?")
					.font(.custom(Font.primary, size: 20))
					
				
				Button {
					isShowingWebView = true
				} label: {
					Text("Log In with RIT Account")
						.bold()
						.font(.custom(Font.primary, size: 18))
				}
			}
		}
		.sheet(isPresented: $isShowingWebView, onDismiss: {}) {
			WebView(request: URLRequest(url: URL(string: "https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&ved=2ahUKEwiWwOHd-4bzAhU1ElkFHTSKAsIQFnoECAcQAQ&url=https%3A%2F%2Fwww.rit.edu%2Fmyrit&usg=AOvVaw2L7KHEliiQsVYUV78E9r39")!))
		}
    }
}

struct IdentificationScreen_Previews: PreviewProvider {
    static var previews: some View {
		IdentificationScreen()
			.previewInterfaceOrientation(.landscapeLeft)
    }
}
