//
//  BusinessRules.swift
//  iSchoolCheckInKiosk
//
//  Created by Lowell Pence on 9/23/21.
//

import Foundation

final class BusinessRules {
	
	let maxReasons: Int
	let api: String
	
	static let shared = BusinessRules()
	
	init() {
		let filename = "BusinessRules"
		
		guard let path = Bundle.main.path(forResource: filename, ofType: "plist") else {
			fatalError("Could not locate required file in bundle: \(filename).plist")
		}
		
		guard let rules = NSDictionary(contentsOfFile: path) else {
			fatalError("Could not convert \(filename).plist to Dictionary type. " +
					   "Check that plist is formatted as a dictionary, and not an array.")
		}
		
		guard let maxReasons = rules["maxReasons"] as? Int else {
			fatalError("\(filename).plist is missing entry 'maxReasons' with associated number value.")
		}
		
		guard let api = rules["api"] as? String else {
			fatalError("\(filename).plist is missing entry 'api' with associated URL to the api.")
		}
		
		self.api = api
		self.maxReasons = maxReasons
	}
}


extension String {
	var isValidRITidFormat: Bool {
		let isNumerical  = CharacterSet.decimalDigits.isSuperset(of: CharacterSet(charactersIn: self))
		let isNineDigits = self.count == 9
		
		return isNumerical && isNineDigits
	}
}


enum Rules {
	static let maxReasons = BusinessRules.shared.maxReasons
}

enum API {
	static let address = BusinessRules.shared.api
}
