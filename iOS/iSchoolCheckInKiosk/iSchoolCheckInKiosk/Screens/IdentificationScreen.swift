//
//  IdentificationScreen.swift
//  IdentificationScreen
//
//  Created by Lowell Pence on 9/3/21.
//

import SwiftUI

struct IdentificationScreen: View {
    var body: some View {
        Text("Please swipe your RIT ID")
    }
}

struct IdentificationScreen_Previews: PreviewProvider {
    static var previews: some View {
        IdentificationScreen()
			.previewInterfaceOrientation(.landscapeLeft)
    }
}
