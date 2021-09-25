//
//  Advisor.swift
//  Advisor
//
//  Created by Lowell Pence on 9/2/21.
//

import Foundation
import SwiftUI


struct Advisor: Identifiable, Decodable {
	var id = UUID()
	let name: String
	let picture: URL?
	var isAvailable: Bool
}


struct Student: Identifiable, Decodable {
	var id = UUID()
	let fname: String
	let lname: String
}


struct Reason: Identifiable, Hashable, Decodable {
	var id = UUID()
	let name: String
	let needsAppointment: Bool
	var selected: Bool = false
}
