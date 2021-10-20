//
//  HeaderView.swift
//  iSchoolCheckInKiosk
//
//  Created by Lowell Pence on 9/17/21.
//

import SwiftUI

struct HeaderView: View {
	
	@ObservedObject var session: CheckInSession
	
    var body: some View {
		HStack {
			Image("rit_logo")
				.resizable()
				.aspectRatio(contentMode: .fit)
				.frame(height: 70, alignment: .topLeading)
				.padding(.horizontal, 40)
			
			Spacer()
			
			Text("Resetting in \(session.timeRemaining)").padding()
		}
    }
}

struct HeaderView_Previews: PreviewProvider {
    static var previews: some View {
        HeaderView(session: CheckInSession())
    }
}
