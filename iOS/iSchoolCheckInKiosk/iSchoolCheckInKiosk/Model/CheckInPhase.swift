//
//  CheckInPhase.swift
//  iSchoolCheckInKiosk
//
//  Created by Lowell Pence on 9/17/21.
//

import Foundation

enum CheckInPhase: Equatable {
	
	case identification
	case reasons
    case advisors
	case done(Resolution)
	
	enum Resolution: Equatable {
		case confirmed
	    case denied(DeniedReasons)
		
		enum DeniedReasons {
			case reasonRequiresAppt
			case networkError
			case missingData
			
			func message() -> String {
				switch self {
					case .reasonRequiresAppt:
						return "Due to your provided visit reasons, you will need to schedule an appointment and come back later."
					case .networkError:
						return "There was an error finalizing check-in. Please see the front desk for assistance."
					case .missingData:
						return "There was an error collecting enough information to complete check in. Please see the front desk for assistance."
				}
			}
		}
	}

}
