//
//  NetworkManager.swift
//  iSchoolCheckInKiosk
//
//  Created by Lowell Pence on 9/19/21.
//

import Foundation

final class NetworkManager {
	
	static let errorManager = ErrorManager.shared

	
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
		
		guard let url = URL(string: "https://www.google.com") else { return [] }
		
		guard let (data, _) = await makeRequest(url) else { return [] }
		
		do {
			return try JSONDecoder().decode([Advisor].self, from: data)
		} catch {
			// TODO: Handle response error
			print("ADVISOR PARSE ERROR: \(error)")
		}
		
		return []
	}
	
	
	static func fetchStudent(id: String) async -> Student? {
		guard let url = URL(string: "test/id=\(id)") else {	return nil }
		
		guard let (data, _) = await makeRequest(url) else { return nil }
		
		do {
			return try JSONDecoder().decode(Student.self, from: data)
		} catch {
			// TODO: Handle response error
			print("STUDENT PARSE ERROR: \(error)")
		}
		
		return nil
	}
	
	
	static func fetchReasons() async -> [Reason] {
		guard let url = URL(string: "https://www.google.com") else { return [] }
		
		guard let (_, _) = await makeRequest(url) else { return [] }
		
		return PreviewContent.getReasons()
		
//		do {
//			return try JSONDecoder().decode([Reason].self, from: data)
//		} catch {
//			// TODO: Handle response error
//			print("REASON PARSE ERROR: \(error)")
//		}
//
//		return []
	}
}
