//
//  ProfilePicture.swift
//  iSchoolCheckInKiosk
//
//  Created by Lowell Pence on 10/25/21.
//

import SwiftUI

struct ProfilePicture: View {
	
	let url: URL?
	
    var body: some View {
		AsyncImage(url: url) { image in
			image.resizable()
		} placeholder: {
			ZStack {
				Color(uiColor: .systemGray5)
					
				Image(systemName: "person.fill")
					.font(.system(size: 40))
					.foregroundColor(.gray)
			}
		}
		.clipShape(Circle())
    }
}

//struct ProfilePicture_Previews: PreviewProvider {
//    static var previews: some View {
//        ProfilePicture()
//    }
//}
