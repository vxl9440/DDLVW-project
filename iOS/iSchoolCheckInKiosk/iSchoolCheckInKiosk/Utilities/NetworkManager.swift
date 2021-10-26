//
//  NetworkManager.swift
//  iSchoolCheckInKiosk
//
//  Created by Lowell Pence on 9/19/21.
//

import Foundation

final class NetworkManager {
	
	static let errorManager = ErrorManager.shared
	private static let api = "http://45.79.164.175/api/kiosk"

	
	private static func makeRequest(_ url: URL) async -> (Data, URLResponse)? {
		do {
			return try await URLSession.shared.data(from: url)
		} catch {
			print("NETWORK ERROR: \(error)")
			await errorManager.presentAlert(AlertContext.networkAlert)
			
			return nil
		}
	}
	
	
	static func fetchAvailableAdivsors() async -> [Advisor] {
		
		guard let url = URL(string: "\(api)/meetingHost/available") else { return [] }
		
		guard let (data, _) = await makeRequest(url) else { return [] }
		
		do {
			return try JSONDecoder().decode([Advisor].self, from: data)
		} catch {
			print(error)
			return []
		}
	}
	
	
	static func fetchStudent(id: String) async -> Student? {
		guard let url = URL(string: "\(api)/student/\(id)") else { return nil }
		
		guard let (data, _) = await makeRequest(url) else { return nil }
		
		do {
			return try JSONDecoder().decode(Student.self, from: data)
		} catch {
			print(error)
			return nil
		}
	}
	
	
	static func fetchReasons() async -> [Reason] {
		guard let url = URL(string: "\(api)/reason") else { return [] }
		
		guard let (data, _) = await makeRequest(url) else { return [] }
		
		do {
			return try JSONDecoder().decode([Reason].self, from: data)
		} catch {
			print(error)
			return []
		}
	}
}
