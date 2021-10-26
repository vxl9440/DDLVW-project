//
//  String+Ext.swift
//  iSchoolCheckInKiosk
//
//  Created by Lowell Pence on 10/9/21.
//

import Foundation

extension String {
	var isInt: Bool {
		Int(self) != nil
	}
	
	var to12HrTime: String {
		let dateFormatter = DateFormatter()
		dateFormatter.dateFormat = "HH:mm:ss"
		
		let date = dateFormatter.date(from: self)!
		dateFormatter.dateFormat = "h:mm a"
		return dateFormatter.string(from: date)
	}
}
