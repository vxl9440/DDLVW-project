//
//  HeaderView.swift
//  iSchoolCheckInKiosk
//
//  Created by Lowell Pence on 9/17/21.
//

import SwiftUI

struct HeaderView: View {
    var body: some View {
		HStack {
			Image("rit_logo")
				.resizable()
				.aspectRatio(contentMode: .fit)
				.frame(height: 100, alignment: .topLeading)
				.padding(.horizontal, 40)
			
			Spacer()
		}
    }
}

struct HeaderView_Previews: PreviewProvider {
    static var previews: some View {
        HeaderView()
    }
}
