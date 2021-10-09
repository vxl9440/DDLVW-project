//
//  Model.swift
//
//  Created by Lowell Pence on 9/2/21.
//

import Foundation


struct Advisor: Identifiable, Decodable {
	var id = UUID()
	let name: String
	let picture: String
}


struct Student: Identifiable, Decodable {
	var id: String
	let studentName: String
	let studentUsername: String
}


struct Reason: Identifiable, Hashable, Decodable {
	var id: String { name }
	let name: String
	let needsAppointment: Bool
}
