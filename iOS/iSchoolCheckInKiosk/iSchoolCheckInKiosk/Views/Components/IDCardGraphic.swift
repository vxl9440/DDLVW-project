//
//  IDCardGraphic.swift
//  iSchoolCheckInKiosk
//
//  Created by Lowell Pence on 9/17/21.
//

import SwiftUI

struct IDCardGraphic: View {
    var body: some View {
		ZStack {
			Image(systemName: SFSymbols.card)
				.font(.system(size: 200))
				.foregroundColor(.ritOrange)
				
			
			Image(systemName: SFSymbols.person)
				.padding(.top, 30)
				.font(.system(size: 60))
				.blendMode(.destinationOut)
			
		}
		.compositingGroup()
		.symbolVariant(.fill)
    }
}

struct IDCardGraphic_Previews: PreviewProvider {
    static var previews: some View {
        IDCardGraphic()
    }
}
