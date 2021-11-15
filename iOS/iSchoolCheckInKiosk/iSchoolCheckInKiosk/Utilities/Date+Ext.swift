//
//  Date+Ext.swift
//  iSchoolCheckInKiosk
//
//  Created by Lowell Pence on 11/14/21.
//

import Foundation

extension Date {
	static var timeIn: String {
		Date()
			.ISO8601Format(
				.init(dateSeparator: .dash,
					  dateTimeSeparator: .standard,
					  timeSeparator: .colon,
					  timeZoneSeparator: .colon,
					  includingFractionalSeconds: false,
					  timeZone: .current)
			)
	}
}
