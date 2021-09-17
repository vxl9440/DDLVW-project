//
//  Advisor.swift
//  Advisor
//
//  Created by Lowell Pence on 9/2/21.
//

import Foundation
import SwiftUI


struct Advisor: Identifiable {
	let id = UUID()
	let name: String
	let picture: URL?
	var isAvailable: Bool
}


struct Student: Identifiable {
	let id = UUID()
	let name: String
	let userName: String
}


struct Reason: Identifiable {
	let id = UUID()
	let name: String
	let needsAppointment: Bool
	var selected: Bool = false
}
