//
//  CheckInPhase.swift
//  iSchoolCheckInKiosk
//
//  Created by Lowell Pence on 9/17/21.
//

import Foundation

enum CheckInPhase {
	
	case identification, appointmentType, reasons, denied, advisors, confirmation
	
	func proceed(happyPath: Bool = true) -> CheckInPhase {
		switch self {
			case .identification:
				return .appointmentType
			case .appointmentType:
				return .reasons
			case .reasons:
				return happyPath ? .advisors : .denied
			case .advisors:
				return .confirmation
			case .denied, .confirmation:
				return .identification
		}
	}
	
	
	var back: CheckInPhase {
		switch self {
			case .denied, .confirmation, .identification, .appointmentType:
				return .identification
			case .reasons:
				return .appointmentType
			case .advisors:
				return .reasons
		}
	}
}
